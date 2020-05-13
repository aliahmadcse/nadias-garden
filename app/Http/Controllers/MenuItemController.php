<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuItemPost;
use Illuminate\Http\Request;
use App\MenuItem;

class MenuItemController extends Controller
{
    public function store(MenuItemPost $request)
    {
        MenuItem::create($request->validated());
    }

    public function update(MenuItemPost $request, MenuItem $menuItem)
    {
        $menuItem->update($request->validated());
    }
}
