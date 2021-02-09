var Navigation = {
    wrapperClassName : 'CAE_Navigation',

    init(){
        this.addNavigation();

        this.bindTranslatesToggle();
    },

    addNavigation(){
        var node = document.createElement('div');

        let editorLIText = __("Režim upravovania"),
            adminLiText = __("Administrácia webu"),
            editorLI = CAEditor.config.enabled ? `<li id="CAE_ToggleState">
                            <label class="CAE_Checkbox CAE_Icons">
                                ${editorLIText}
                                <input type="checkbox">
                                <div><div></div></div>
                            </label>
                        </li>` : '';

        node.className = this.wrapperClassName;
        node.innerHTML = `
            <div class="CAE_Navigation_button">
                <button></button>
                <div class="CAE_Navigation_navbar">
                    <ul>
                        <li><a class="CAE_Icons" href="${CAEditor.config.requests.admin}" target="_blank">${adminLiText} <i class="CAE_Icon--link"></i></a></li>
                        ${editorLI}
                    </ul>
                </div>
            </div>
        `;

        document.getElementsByTagName('body')[0].appendChild(node);
    },

    bindTranslatesToggle(){
        var toggle = document.getElementById('CAE_ToggleState');

        //If editor is turned off
        if ( !toggle ){
            return;
        }

        toggle.getElementsByTagName('input')[0].checked = CAEditor.config.active;

        toggle.addEventListener('change', (e) => {
            CAEditor.toggle();
        })
    }
}

export default Navigation;