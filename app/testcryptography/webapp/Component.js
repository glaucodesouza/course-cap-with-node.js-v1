sap.ui.define([
    "sap/ui/core/UIComponent",
    "testcryptography/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models, JSONModel) => {
    "use strict";
    
    return UIComponent.extend("testcryptography.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // Criar o modelo Detail, vazio
            // const crypto = require('crypto');
            const algorithm = 'aes-256-cbc';
            const key = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);

            let dadosModelLocal = {
                usuario: "Usuário",
                cpf: "055.111.987-01",
                senha: "@Senha12345678",
                usuarioCriptografado: encrypt("Usuário"),
                cpfCriptografado: encrypt("055.111.987-01"),
                senhaCriptografado: encrypt("@Senha12345678"),
                crypto: crypto,
                algorithm: algorithm,
                key: key,
                iv: iv
            };
            let modelLocal = new JSONModel();
            modelLocal.setData(dadosModelLocal);
            this.setModel(modelLocal,"modelLocal");
            // sap.ui.getCore().setModel(modelLocal,"modelLocal");


        },


		encrypt(text) {
		  const cipher = crypto.createCipheriv(algorithm, key, iv);
		  let encrypted = cipher.update(text, 'utf8', 'hex');
		  encrypted += cipher.final('hex');
		  return encrypted;
		},

		decrypt(encrypted) {
		  const decipher = crypto.createDecipheriv(algorithm, key, iv);
		  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
		  decrypted += decipher.final('utf8');
		  return decrypted;
		}
    });
});