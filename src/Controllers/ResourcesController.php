<?php

namespace Admin\Resources\Controllers;

class ResourcesController extends Controller
{
    protected $whitelisted = [
        'vendor/crudadmin/css/app.css',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $path = request()->path();

        $replacedPath = str_replace_first('.dynamic.', '.', $path);

        if ( !in_array($replacedPath, $this->whitelisted) ){
            abort(404);
        }

        $basepath = public_path($replacedPath);

        $data = file_get_contents($basepath);
        $data = $this->replaceData($data);

        return response($data, 200)
                    ->header('Content-Type', 'text/css')
                    ->setMaxAge(3600 * 24 * 365);
    }

    private function replaceData($data)
    {

        $colors = [
            '#4A54E2' => config('admin.primary_color'),
        ];

        foreach ($colors as $color => $toColor) {
            if ( !$toColor ){
                continue;
            }

            $data = str_replace(strtolower($color), $toColor, $data);
            $data = str_replace(strtoupper($color), $toColor, $data);
        }

        return $data;
    }
}
