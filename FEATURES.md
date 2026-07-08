# CrudAdmin Resources — Capabilities Reference

> The UI resources bundle for the **CrudAdmin** CMS framework (`crudadmin/resources`, v5.0.0).
> A hybrid **Laravel package + Vue 3 SPA** that turns a Laravel Eloquent model definition (delivered
> as JSON) into a complete CRUD interface — forms, tables, search, filters, relations, history,
> exports, statistics and more — with zero hand-written admin views per model.

This document describes **everything the package supports**: the model schema it consumes, every
field type, every field attribute, every model-level setting, and the high-level features built on
top of them.

---

## Table of contents

1. [How it works](#1-how-it-works)
2. [The model schema](#2-the-model-schema)
3. [Field types](#3-field-types)
4. [Field attributes](#4-field-attributes)
5. [Conditional attribute system](#5-conditional-attribute-system)
6. [Relations](#6-relations)
7. [Model settings](#7-model-settings)
8. [Form layout: groups, tabs & widths](#8-form-layout-groups-tabs--widths)
9. [Table / data-grid features](#9-table--data-grid-features)
10. [Search & filters](#10-search--filters)
11. [Localization & multi-language](#11-localization--multi-language)
12. [History & versioning](#12-history--versioning)
13. [Permissions](#13-permissions)
14. [Custom components & layout injection](#14-custom-components--layout-injection)
15. [Statistics & dashboard](#15-statistics--dashboard)
16. [Site-tree / menu builder](#16-site-tree--menu-builder)
17. [Editors & file management](#17-editors--file-management)
18. [Frontend live editing](#18-frontend-live-editing)
19. [PHP backend](#19-php-backend)
20. [Architecture & build](#20-architecture--build)

---

## 1. How it works

Laravel models declare their fields, validation, relations and admin behaviour server-side. The
backend serializes the whole model tree into a single JSON object exposed to the browser as
`window.crudadmin.layout.models`. The Vue SPA reads that object and **generates the entire admin UI
at runtime** — no per-model templates.

```
Laravel Model  ──serialize──▶  window.crudadmin.layout.models (JSON)  ──▶  Vue 3 SPA
   (fields,                         { settings, columns, fields,            (forms, tables,
    relations,                        fields_groups, permissions,            search, modals,
    rules)                           childs, submenu, … }                    history, charts)
```

The SPA is hash-routed with just two routes:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/dashboard` (alias `/`) | `DashBoardView` | Dashboard + statistics |
| `/page/:model` | `BasePageView` → `ModelBuilder` | Generic CRUD page for any model |

Each model becomes a runtime `Model` instance (`helpers/Model/Model.js`) composed of mixin modules
(`ModelFields`, `ModelTableRows`, `ModelColumns`, `ModelRowActions`, `ModelFormActions`,
`ModelTabs`, `ModelDragAndDrop`, `ModelProperties`, `ModelComponents`, `ModelEvents`,
`ModelButtonActions`, `ModelGroups`, `ModelCoreHelpers`). Each field becomes a `Field` instance
(`helpers/Field/Field.js`) with `FieldTypes`, `FieldProperties`, `FieldValue`, `FieldOptions`,
`FieldCasts`, `FieldLocale`, `FieldHistory`.

---

## 2. The model schema

Every model node in the JSON has this shape (top-level keys):

| Key | Type | Meaning |
|-----|------|---------|
| `name` | string | Human label shown in menu & headings |
| `slug` | string | URL slug / identifier (e.g. `products`) |
| `table` | string | DB table name |
| `icon` | string | FontAwesome icon (e.g. `fa-barcode`) |
| `title` | string | Subtitle / description on the page |
| `active` | bool | Whether module is enabled |
| `columns` | string[] | Column keys shown in the table |
| `fields` | object | Map of `fieldKey → field definition` (see §3–4) |
| `fields_groups` | array | Form layout tree: groups, tabs, widths (see §8) |
| `settings` | object | Per-model behaviour toggles (see §7) |
| `permissions` | object | `read / insert / update / delete / publishable / …` flags (see §13) |
| `childs` | object | Nested child models (rendered as tabs) |
| `submenu` | object | Child modules grouped under a menu parent (`#$_…` nodes) |
| `searches` | object | Predefined / static search definitions (see §10) |
| `exports` | array | Custom export buttons (see §9) |
| `layouts` | array | Runtime Vue components injected at positions (see §14) |
| `components` | object | Inline Vue component source compiled at runtime (see §14) |
| `orderBy` | `[col, dir]` | Default sort, or `false` to disable |
| `foreign_column` | object | `{ parentTable: fkColumn }` — links child to parent |
| `localization` | bool | Whether model is multi-language |
| `sortable` | bool | Enable drag-to-reorder (`_order`) |
| `publishable` / `publishableState` | bool | Publish / unpublish toggle on rows |
| `history` | bool | Per-row change history |
| `insertable` / `editable` / `displayable` / `deletable` | bool/obj | CRUD capability flags (`deletable` may be `{deep:true}`) |
| `single` | bool | Singleton model (one row, form-only) |
| `minimum` / `maximum` | int | Row-count constraints |
| `reserved` / `in_menu` / `without_parent` / `global_relation` / `inParent` | bool | Structural flags |
| `hidden_tabs` / `hidden_groups` | array | Hide named tabs / groups |

**Menu grouping** — keys beginning with `#$_` (e.g. `#$_settings`, `#$_orders`) are *menu groups*:
they carry a `submenu` of real models and don't render a page themselves.

---

## 3. Field types

Each field has a `type`. The type maps to a Vue field component via `helpers/Field/FieldTypes.js`
and `components/Forms/FormInputBuilder.vue`:

| `type` value(s) | Component | Notes |
|-----------------|-----------|-------|
| `string` | `StringField` | Text input |
| `password` | `StringField` | Password input; not required on update; supports `confirmed` |
| `integer`, `decimal` | `NumberField` | Numeric input; `decimal` uses `decimal_length` (`"8,2"`) and stepped precision |
| `text`, `longtext` | `TextField` | `<textarea>` |
| `editor`, `longeditor` | `TextField` | CKEditor rich-text (WYSIWYG) |
| `gutenberg` | `GutenbergField` | WordPress Gutenberg block editor (`window.Gutenberg`) |
| `select` | `SelectField` | Single/multi dropdown (vue-multiselect); relations, async, tags |
| `radio` | `RadioField` | Radio group |
| `checkbox` | `CheckboxField` | iOS-style toggle; `boolean` cast; supports `tooltip` |
| `color` | `ColorField` | Color picker (vue3-colorpicker) + hex input |
| `phone` | `PhoneField` | International phone (vue-tel-input); default country SK |
| `date`, `datetime`, `time`, `timestamp` | `DateTimeField` | Date/time picker (@vuepic/vue-datepicker), `multiple` calendar, `date_step` |
| `file` | `FileField` | Upload(s); `image`, `multiple`, `canDelete`, `canDownload`, draggable previews |
| `uploader` | `UploaderField` | File-manager-backed uploader (UUID-keyed) |
| `json` | (custom component) | Typically rendered by a model `component` (e.g. permission matrix) |

> `time` with `multiple` also has a dedicated `TimePickerField` (24h × step-minute grid).
> `Select2Field.vue` exists but is an empty stub (legacy placeholder).

---

## 4. Field attributes

Attributes are extra keys on a field definition. Below is the full vocabulary the SPA understands,
grouped by purpose. (Booleans default to `false`/absent unless noted.)

### Identity & display
| Attribute | Effect |
|-----------|--------|
| `name` | Field label |
| `placeholder` | Input placeholder (falls back to `name`) |
| `title` | Help text shown under the field |
| `tooltip` | Tooltip on the label |
| `default` / `defaultByOption` | Default value source |
| `counter` | Show a `current/max` character counter |

### Validation / constraints
| Attribute | Effect |
|-----------|--------|
| `required` | Field required (see conditional variants in §5) |
| `required_if` / `required_unless` / `required_with` / `required_without` | Conditional required |
| `max` / `min` | Max / min length or value |
| `size` | Exact length |
| `unique` / `unique_index` | Uniqueness rule string (e.g. `table,col,NULL,id,deleted_at,NULL`) |
| `email` | Email validation |
| `confirmed` | Renders a confirmation duplicate field (passwords) |
| `integer` / `numeric` / `boolean` | Value-type casts |
| `decimal_length` | `"total,fraction"` for decimals |
| `gte` / etc. | Comparison rules against other fields |
| `extensions` | Allowed file extensions (e.g. `xls,csv,xlsx`) |

### Form visibility / state
| Attribute | Effect |
|-----------|--------|
| `hidden` | Field hidden in form (still submitted) |
| `removeFromForm` | Field removed from form entirely |
| `invisible` | Field not rendered |
| `inaccessible` | Field cannot be accessed/edited |
| `readonly` | Read-only input |
| `disabled` | Disabled input |
| `hideFieldIf` / `hideFromFormIf` / `visibleFieldIf` | Conditional visibility (see §5) |
| `removeFromFormIf` / `removeFromFormIfNot` | Conditional removal |
| `disabledIf` / `disabledIfNot` | Conditional disable |
| `hideOnCreate` / `hideOnUpdate` | Hide depending on new vs existing row |
| `ifExists` / `ifDoesntExists` | Show only on existing / new row |

### Persistence semantics
| Attribute | Effect |
|-----------|--------|
| `encrypted` | Value stored encrypted |
| `imaginary` | Computed field, not a real DB column |
| `index` | Indexed column |
| `enum` | Enum field (fixed option set) |
| `locale` | Localized per language (value stored as `{en:…, sk:…}`) — see §11 |
| `array` / `multiple` | Multi-value (arrays, multi-select, multi-file) |

### Table / column behaviour
| Attribute | Effect |
|-----------|--------|
| `column_visible` | Always show in table even if normally hidden |
| `column_present` | Keep column present |
| `column_editable` | Inline-editable cell (debounced auto-save) |
| `column_component` | Custom Vue component for the cell |
| `column_name` | Override column header |
| `unsearchable` | Exclude from search |

### Select / relation specifics
| Attribute | Effect |
|-----------|--------|
| `belongsTo` | `"Table,displayField"` single relation |
| `belongsToMany` | `"Table,displayField"` many-to-many (forces multiple) |
| `options` | Inline option list `[[id,label],…]` |
| `option` | Display template (e.g. `:name`, `:name - :ean`) |
| `async` | Server-side async option search |
| `filterBy` | `"parentField,optionAttr"` dependent/cascading select |
| `fillBy` | Auto-fill another field from the chosen option |
| `unique_options` | Hide already-used options |
| `required_with_values` | Required only when options exist |
| `canAdd` / `canEdit` / `canView` / `canList` | Inline related-row actions (modal) |
| `canDownload` / `canDelete` | File field action toggles |

### Component overrides
| Attribute | Effect |
|-----------|--------|
| `component` | Replace the native field with a custom component |
| `sub_component` / `component_sub` | Render an extra component after the field |

---

## 5. Conditional attribute system

Almost every boolean attribute supports **conditional variants**, evaluated reactively against other
field values (`helpers/Model/ModelFields.js: tryAttribute / isMatchedAttributesValues`):

| Suffix | Meaning |
|--------|---------|
| `attr` | static `true`/`false` |
| `attrIf` | true when `otherField == value` |
| `attrIfNot` | true when `otherField != value` |
| `attrIfIn` | true when `otherField ∈ [values]` |
| `attrIfNotIn` | true when `otherField ∉ [values]` |

**Value syntax:** `"fieldName,value1,value2,…"` (comma-separated; OR semantics for the IN variants).

**Special operands:** `NULL`, `TRUE`, `FALSE`, empty string (= null). Works with multi-select arrays.

**Cross-model references:**
- `$parentTable.fieldName` — read a value from the parent model
- `$$childTable.fieldName` — read from a child model
- `fieldName.optionAttribute` — compare against an attribute of the selected select/radio option
  (e.g. `removeFromFormIfNot: "type.warehouse,TRUE"`)

Applies to: `required*`, `hidden* / hideField* / hideFromForm*`, `visible*`, `removeFromForm* /
removeField*`, `invisible*`, `inaccessible*`, `disabled*`, `readonly*`. Group/tab visibility uses
the same engine.

---

## 6. Relations

| Mechanism | Declared via | Behaviour |
|-----------|--------------|-----------|
| **belongsTo** | `belongsTo: "Table,col"` | Single-select dropdown of related rows; optional inline add/edit/view modal (`canAdd`/`canEdit`/`canView`) |
| **belongsToMany** | `belongsToMany: "Table,col"` | Tag-style multi-select; sends `name[]` array |
| **Child models** | `childs: {…}` + `foreign_column` | Related models rendered as **tabs** inside the parent form, pre-filtered by FK |
| **Dependent selects** | `filterBy: "parent,attr"` | Options filtered by another field's value |
| **Auto-fill** | `fillBy` | Selecting an option fills a sibling field |
| **Async options** | `async: true` | Options fetched from server on search |
| **Display templates** | `option` / `belongsTo` second part | `:column` interpolation, e.g. `products,:name - :ean` |

Child models can themselves have children (recursive nesting), with recursion guards in
`FormTabsBuilder.vue`. Tabs lazy-load their rows when opened (`tabs_autoload`).

---

## 7. Model settings

`settings` toggles per-model behaviour. Common keys observed across projects:

```jsonc
"settings": {
  "title":   { "create": "New product", "update": ":ean - :name" },  // dynamic titles
  "buttons": { "create": "New product" },                            // CTA label
  "grid":    ["full"],            // or ["small","half","big","full"] enabled grid sizes
  "increments": true,            // show incremental # column
  "xls": true,                   // enable Excel export
  "form": {
    "autocomplete": "off",
    "actions": true,             // show action buttons in form
    "modal": { "enabled": true, "width": "1600px" }   // open form in a modal
  },
  "search": { "autosave": true, "column": "code", "static": true },
  "filter": {                    // status filters (see §10)
    "single": true,
    "items": { "new": { "name": "New", "color": "orange", "query": {} } }
  },
  "columns": {                   // per-column overrides
    "created_at": { "name": "Created", "hidden": false, "format": "d.m.Y H:i", "before": "user_id" },
    "totalStock": { "name": "Qty" }
  },
  "fields": {                    // per-field setting overrides (e.g. select options behaviour)
    "brand_name": { "options": { "createOption": true, "searchable": true } },
    "poedit_po":  { "canDownload": false, "canDelete": false }
  },
  "pagination": { "limits": [5,10,50,100,300] },   // or false to disable
  "table": { "small": true },
  "is_debug": true, "autoreset": false
}
```

**Settings cheat-sheet**

| Area | Keys |
|------|------|
| Titles & buttons | `title.{create,update,insert}`, `buttons.create` |
| Grid | `grid` / `grids` (`small`,`half`,`big`,`full`), `grid.default`, `grid.{size}.disabled` |
| Table | `table.small`, `increments`, `columns.{key}.{name,hidden,format,before,after,limit,encode,component}` |
| Search | `search.{autosave,column,static,per_column}` |
| Filters | `filter.{single,items}` |
| Form | `form.{autocomplete,actions,modal,tabs,header,footer}` |
| Pagination | `pagination.limits`, `pagination` (bool) |
| Refresh | `refresh_interval` (auto-polling) |
| Exports | `xls`, `exports[]` |

---

## 8. Form layout: groups, tabs & widths

`fields_groups` is a tree describing how fields are laid out. Each node:

```jsonc
{
  "name": "Orion settings",     // null = no card heading
  "fields": ["client_id", { …nested group… }, "client_secret"],
  "type": "default" | "tab",    // "tab" = a tab (optionally a child-model tab)
  "width": "full" | "half" | "third" | "full-inline" | "half-inline" | 6,
  "icon": "fa-layer-group",
  "model": "products_stocks",   // child-model tab
  "modelNamespace": "App\\Models\\…",
  "where": {}, "attributes": { "removeFromForm": true }, "component": null,
  "enabled": true, "prefix": null
}
```

- **Groups** can nest arbitrarily; a named group renders as a Bootstrap card.
- **Widths**: `half`→col-6, `full`→col-12, `third`→col-4; `*-inline` packs fields side-by-side; a
  number is used directly as the column span.
- **Tabs** (`type:"tab"`) group fields or embed a **child model** (`model`+`modelNamespace`),
  rendered with its own table/form, count badge, lazy loading, and optional `attributes`/`where`.
- `component` on a group/tab renders a custom Vue component in its place.
- Hidden via `hidden_tabs` / `hidden_groups` or conditional `visibleField*`/`hideField*` attributes.

---

## 9. Table / data-grid features

Rendered by `components/Rows/*` and driven by `ModelTableRows` / `ModelColumns`.

- **Pagination** — configurable page-size limits, persisted per table (`store/table.js`); `single`/`inParent` models skip pagination; limit `0` hides the table, `-1` = unlimited.
- **Sorting** — click column headers; `orderBy: [col, dir]`; default from settings or `false`.
- **Drag-to-reorder** — when `sortable:true`; updates `_order`, persists via API, supports moving rows between parents in recursive models (disabled on mobile).
- **Column selection & ordering** — show/hide and reorder columns; persisted to `localStorage`. Default-hidden: `language_id, _order, slug, published_at, updated_at, created_at` (overridable via `column_visible`).
- **Virtual columns** — incremental `#` (`increments`), `before`/`after` positioning.
- **Inline editing** — `column_editable` cells edit in place with 750ms-debounced save.
- **Custom cell rendering** — `column_component` for bespoke cells (e.g. `OrderStatusColumn`, `OrderItemProduct`).
- **Value formatting** — selects show labels (not IDs), checkboxes show Yes/No, decimals formatted, dates formatted, colors rendered, files rendered, text truncated (`string_limit` / `columns.{key}.limit`), phone/email become links, copy-to-clipboard on hover.
- **Row indicators** — `$indicator` badges (color/icon), `$class` custom row classes.
- **Bulk selection** — checkboxes, shift-click range select, select-all.
- **Auto-refresh** — periodic polling (`refresh_interval`, randomized 60–120s); auto-disabled for huge tables; live "syncing" indicator with force-refresh.
- **Exports** — Excel (`xls:true`) and custom exports (`exports:[{key,name,icon}]` → `/api/export/{table}/{key}`).
- **Bulk actions** — model-defined action buttons (`ModelButtonActions`).
- **Grid layouts** — `small`/`half`/`big`/`full` split between table and form columns, switchable via `GridChanger`, persisted.

---

## 10. Search & filters

**Search** (`components/Partials/Search*` + `SearchWrapper`):
- **Dynamic** — user picks a column to search.
- **Static / predefined** — from the model `searches` map: `{ field: { static:true, placeholder, column } }`.
- **Per-column** types: text, date (with picker), select/checkbox dropdowns.
- **Interval / range** — "from X to Y" with a second `query_to` input.
- **Autosave** — `search.autosave` persists queries to `localStorage`; debounced; client uses **fuse.js** for fuzzy matching where applicable.

**Filters** (`components/Rows/RowsFilter.vue`):
- Colored **status filters** (`filter.items` with `name`,`color`,`icon`,`query`).
- **Single** (exclusive) or **multi** (`filter.single`).
- Rendered as a button group (≤5 items) or dropdown; sent to the API as a scope (`filterProperty`).

---

## 11. Localization & multi-language

- **Per-field localization** — `locale:true` stores values as `{en:…, sk:…}`; the form renders one
  input per language, with a language switcher and per-language validation highlighting.
- **Model localization** — `localization:true` marks the whole model multi-language; the active
  language comes from `useAppStore().language_id`.
- **Localized relation options** — select options can be filtered by the active `language_id`.
- **Gettext editor** — `ModalGettext` + the Gettext plugin manage UI translation strings
  (`__`, `_`, `gettext`, `n__`, `p__`, …) available globally in every component.
- **Language mutation model** — the `languages` settings model manages site languages, source
  language, and `.po`/`.mo` translation file uploads.
- **Bundled admin languages** — English, Czech, Slovak (`lang/{en,cs,sk}/admin.php`, ~170 keys).

---

## 12. History & versioning

When `history:true`:
- **Row history** (`HistoryModal`) — per-row audit trail: who changed it, when, action
  (created/updated/deleted), and number of changed fields; view a historical version; delete
  individual history entries (except the oldest), permission-gated on `models_histories`.
- **Field history** (`HistoryFieldModal`) — before/after values for a single field across versions;
  fields with unsaved/historical differences are visually flagged (`is-changed-from-history`,
  `--dirty`).

---

## 13. Permissions

Each model carries a `permissions` object; the SPA enforces it throughout:

| Permission | Gates |
|------------|-------|
| `read` | Viewing rows, search bar, columns |
| `insert` | Create button, add-row form |
| `update` | Edit form submit, inline editing |
| `delete` | Delete buttons, history deletion |
| `publishable` | Publish/unpublish toggle |
| custom (e.g. `roles`, `logout`, `view_others`, `reverse_import`, `different_warehouses`, `full_access`, `all`) | Model-specific actions |

The **roles/permissions matrix** itself is a showcase of the custom-component system: the
`admins_roles` model ships an inline `UsersRolesRestriction` Vue component (stored as a string in
`components`) that renders a per-module permission grid compiled at runtime.

---

## 14. Custom components & layout injection

The package can render **arbitrary Vue components defined server-side as strings**, compiled in the
browser (`composables/components.js: useComponentObject` → `new Function(...)` → `defineComponent`).

- **Field component** — `field.component` / `sub_component` / `column_component`.
- **Model components** — `model.components = { name: "<vue source string>" }`; referenced by name.
- **Layout injection** — `model.layouts[]` injects components at named **positions** in the page:
  `mutators`, `before_fields`, `after_fields`, `after_form_actions`, `table-header-actions`,
  `table-footer`, `form-header-left/right`, `form-top/bottom`, `top`, `bottom`, `actions-grid`, etc.
  (`ModelComponents.getComponents(position)` + `CustomComponents.vue`).
- Injected components receive `model`, `row`, and `rows` props, with full access to model methods
  and reactivity. Embedded `<script>`/`<style>` tags are executed/injected on render.
- Legacy Vue 1 → Vue 3 compatibility shims (`ready` → `mounted`).

---

## 15. Statistics & dashboard

`components/Statistics/*` + Chart.js (`vue-chartjs`):
- **StatisticsRenderer** iterates configured statistics; **StatisticView** fetches data from
  `/api/statistics/{name}` with the model's active scopes/search.
- **Filters & ranges** — button groups for filter selection and time grouping (daily/weekly/
  monthly/yearly via `group_format`).
- **Bar charts** (`StatsChartBar`) — multi-dataset, themed colors, period aggregation, custom
  tooltips with units; reactive to model scope/search changes.

---

## 16. Site-tree / menu builder

`components/Extensions/SiteTreeBuilder/*` + `store/sitetree.js`:
- Hierarchical, drag-sortable tree for building site menus / page structures.
- Node types: **group** / **group-link** (folders), **url** (direct links), **model** (reference a
  row of another model).
- Inline localized name editing, collapse/expand, insertability lock, per-row custom actions,
  recursive nesting; saves to `/sitetree/store` with validation handling.

---

## 17. Editors & file management

- **CKEditor** — rich text for `editor`/`longeditor` fields (`main.js` `ckEditors()` initializer).
- **Gutenberg** — block editor for `gutenberg` fields (single-instance management, debounced sync).
- **CKFinder** — file browser integration; auto-downloaded via `php artisan ckfinder:download`,
  guarded by `CKFinderMiddleware`, served at `/admin/api/ckfinder/*`.
- **Laravel FileManager (LFM)** — admin uploads at `/admin/filemanager`; per-user private folders,
  shared folder, per-model auto-categorized storage, thumbnails (200×200), MIME validation; powers
  the `uploader` field type via `FileManagerModal`.

---

## 18. Frontend live editing

`plugins/FrontendEditor.js` + `plugins/Editor/*` (shipped as a separate bundle, `window.CAEditor`):
- **Inline "pencil" editing** of live website content from the frontend.
- Modules: **Editor** (contentEditable + inline CKEditor), **Translatable** (edit gettext strings in
  place, DOM-normalized, debounced AJAX), **Uploadable** (image/file replace from frontend),
  **Editable** (`data-crudadmin-editor`), **Linkable** (edit hrefs), **Pencils** (visual markers),
  **Observer** (MutationObserver to track DOM changes).
- **Encryptable** / **VisibleRoutes** frontend plugins for decrypting protected content and
  resolving route templates (`action('/user/{id}')`).

---

## 19. PHP backend

`src/Resources/` is a standard Laravel package.

**Routes** (`routes.php`): admin auth (login with multi-provider support, password reset, 2FA
`verificator`), dashboard (`/admin`), logout, and CKFinder endpoints.

**Controllers**: `Auth\{Login,ForgotPassword,ResetPassword,Verificator}Controller`,
`DashboardController` (renders `admin::template`), `CKFinderController`.

**Providers**: `AppServiceProvider` (views, lang, middleware), `RouteServiceProvider`,
`PublishServiceProvider` (publishes `/dist` → `public/vendor/crudadmin`), `CommandsServiceProvider`,
`FileManagerServiceProvider` (LFM wiring).

**Commands**: `admin:update` (publish assets, migrate old uploads), `ckfinder:download`.

**Middleware**: `CKFinderMiddleware`. **Events**: `OnAdminUpdate`. **Config**: `Config/lfm.php`.

**Views**: `template.blade.php` (root layout, Vite assets, `window.crudadmin` props, primary-color
CSS var), auth pages, CKFinder partials, customizable `slots/{meta,scripts}.blade.php`.

**Composer**: PHP ≥ 8.0, `laravel/framework`, `pimple/pimple`, `league/flysystem`,
`unisharp/laravel-filemanager`. Autoloads `Admin\Resources\` and the CKFinder connector.

---

## 20. Architecture & build

**Frontend stack:** Vue 3, Pinia (+ persisted state), Vue Router (hash), Bootstrap 5, FontAwesome 6,
Chart.js, fuse.js, vue-multiselect, @vuepic/vue-datepicker, vue-tel-input, vue3-colorpicker,
vuedraggable, gettext-translator, moment, lodash, axios — with some jQuery for CKEditor/legacy bits.

**Pinia stores:** `app` (config, models, languages, version hash), `auth` (user), `model` (active
instances + option cache), `table` (persisted columns/limit/size/search), `modal` (modal/toast
stack), `header` (sidebar/mobile menu), `sitetree`.

**Build (Vite 6):** entries `js/app.js`, `sass/app.scss`, `plugins/FrontendEditor.js`,
`plugins/Gettextable.js`, `sass/frontend.scss`; aliases `@`, `@components`, `@composables`,
`@helpers`, `@fields`, `@sass`, `@dist`; auto-import of composables/helpers/stores and
auto-registration of components; SCSS globals injected; output hashed to `/dist`.

**Publishing (`publish.js`):** syncs the private repo's built assets to public/client repos, keeps
branch/tag alignment, commits "Production deployment build". Client targets configured in
`config.js`. Runtime version-hash detection prompts a reload when the deployed app changes.

---

*Generated from a full read of the `crudadmin/resources` source (Vue components, model/field helper
classes, Pinia stores, plugins, and the PHP package) cross-referenced against a live
`window.crudadmin.layout.models` payload.*
