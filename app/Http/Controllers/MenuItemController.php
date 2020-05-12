<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MenuItem;

class MenuItemController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->user()->can('edit-menu')) {
            return response('Unauthorized', 403);
        }

        $request->validate([
            'name' => 'required|max:128',
            'description' => 'required|max:512',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|numeric',
            'image' => 'required'
        ]);

        MenuItem::create($request->post());
    }
}
