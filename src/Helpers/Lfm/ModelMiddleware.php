<?php

namespace Admin\Resources\Helpers\Lfm;

use Closure;
use Illuminate\Support\Str;
use UniSharp\LaravelFilemanager\Lfm;
use Admin;

class ModelMiddleware
{
    private $helper;

    private $model;

    public function __construct()
    {
        $this->helper = app(Lfm::class);
    }

    public function handle($request, Closure $next)
    {
        $type = $request->get('type') ?: '';
        $parts = explode('/', $type);

        if ( !(count($parts) === 4 && $parts[0] == 'models') ){
            return;
        }

        $table = $parts[1];
        $field = $parts[2];
        $rowId = $parts[3];

        //Check if given params are valid
        if ( $this->hasValidParams($table, $field, $rowId) === false ){
            abort(401);
        }

        $this->setLFMConfig($table, $field, $rowId, $type);

        return $next($request);
    }

    private function hasValidParams($table, $field, &$rowId)
    {
        //Model does not exists
        if ( !($this->model = Admin::getModelByTable($table)) ){
            return false;
        }

        //Field does not exists
        if ( !$this->model->getField($field) ){
            return false;
        }

        //Check current row avaiability
        if ( is_numeric($rowId) ){
            if ( $this->model->getAdminRows()->where('id', $rowId)->count() === 0 ) {
                return false;
            }
        } else if ( Str::isUuid($rowId) === false ) {
            return false;
        }

        return true;
    }

    private function setLFMConfig($table, $field, $rowId, $type)
    {
        //Set model folder name
        $data = config('lfm.folder_categories.model');
        $data['folder_name'] .= $this->model->getStorageFilePath($field).'/'.(Str::isUuid($rowId) ? 'temp/'.$rowId : $rowId);

        if ( method_exists($this->model, 'setFieldUploader') ){
            $data = $this->model->setFieldUploader($data, $field, $rowId);
        }

        $config = array_merge(config('lfm'), [
            'disk' => $this->model->getFieldDiskName($field),
            'allow_private_folder' => false,
            'allow_shared_folder' => false,
            'shared_folder_name' => null,
            'should_create_thumbnails' => false,
            'folder_categories' => [
                $type => $data
            ],
        ]);

        config()->set('lfm', $config);
    }
}
