var Navigation = {
    wrapperClassName : 'CAE_Navigation',

    init(){
        this.addNavigation();

        this.bindTranslatesToggle();
    },

    addNavigation(){
        var node = document.createElement('div');

        node.className = this.wrapperClassName;
        node.innerHTML = `
            <div class="CAE_Navigation_button">
                <button></button>
                <div class="CAE_Navigation_navbar">
                    <ul>
                        <li><a class="CAE_Icons" href="${CAEditor.config.requests.admin}" target="_blank">${__("Administrácia webu")} <i class="CAE_Icon--link"></i></a></li>
                        <li id="CAE_ToggleState">
                            <label class="CAE_Checkbox CAE_Icons">
                                ${__("Režim upravovania")}
                                <input type="checkbox">
                                <div><div></div></div>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        document.getElementsByTagName('body')[0].appendChild(node);
    },

    bindTranslatesToggle(){
        var toggle = document.getElementById('CAE_ToggleState');

        toggle.getElementsByTagName('input')[0].checked = CAEditor.config.active;

        toggle.addEventListener('change', (e) => {
            CAEditor.toggle();
        })
    }
}

export default Navigation;