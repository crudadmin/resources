@if ( count(Admin::getAuthProviders()) > 1 )
<div class="form-group has-feedback">
  <select class="form-control" name="_provider">
    @foreach( Admin::getAuthProviders() as $key => $model )
    <option value="{{ $key }}" {{ $key == Admin::getAuthProvider() ? 'selected' : '' }}>{{ $model->getProperty('name') }}</option>
    @endforeach
  </select>
</div>
@else
<input type="hidden" name="_provider" value="{{ Admin::getAuthProvider() }}">
@endif