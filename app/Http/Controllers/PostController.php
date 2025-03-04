<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use App\Models\Profile;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        // This will get all the user_id in profiles table using the many-to-many relationship
        // Return [1, 2, 3] array of user_id
        $following = auth()->user()->following()->pluck('profiles.user_id');
        $following->push(auth()->user()->id);
        $posts = Post::whereIn('profile_id', $following)
            ->with(['profile.user', 'image', 'likes' => function ($query) {
                $query->wherePivot('user_id', auth()->user()->id); // To check if user liked the post
            }])
            ->withCount('likes')
            ->withCount('comments')
            ->latest()
            ->get();

        return response($posts, 200);
    }

    public function show($id)
    {
        $post = Post::with(['profile.user', 'image', 'comments.user', 'likes' => function ($query) {
            $query->wherePivot('user_id', auth()->user()->id); // To check if user liked the post
        }])
            ->withCount('likes')
            ->find($id);

        if (!$post) {
            return response([
                'message' => 'Post not found'
            ], 404);
        }

        return response($post, 200);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'caption' => ['required', 'string'],
            'image' => ['required']
        ]);

        $newPost = Post::create([
            'profile_id' => $request->user()->profile->id,
            'caption' => $request->caption,
        ]);

        $uploadedFileUrl = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';

        if ($request->hasFile('image')) {
            $uploadedFileUrl = $request->file('image')->store('uploads', 'public');
            $APP_URL = env('APP_URL', 'http://localhost:8000');
            $uploadedFileUrl = $APP_URL . '/storage/' . $uploadedFileUrl;
        }

        Image::create([
            'imageable_id' => $newPost->id,
            'imageable_type' => 'App\Models\Post',
            'url' => $uploadedFileUrl,
        ]);

        return response($newPost, 201);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response([
                'message' => 'Post not found'
            ], 404);
        }

        $post->delete();

        return response([
            'message' => 'Post deleted'
        ], 200);
    }

    public function likePost(Post $post)
    {
        return auth()->user()->post_like()->toggle($post);
    }
}
