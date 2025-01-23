sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Core",
    "sap/ui/model/json/JSONModel"
], (Controller, Core, JSONModel) => {
    "use strict";

    return Controller.extend("testcryptography.controller.View1", {
        onInit() {
                //Criar a tabela de dados e Model p/ o WORKLIST com as TODAS as Validacoes
                // let dadosModelLocal = [];
                let modelLocal = this.getOwnerComponent().getModel("modelLocal");
                // if (!modelLocal.oData?.usuario) {
                //     // Core.getModel(modelLocal,"modelLocal");
                //     sap.ui.getCore().getModel(modelLocal,"modelLocal");
                // }
                // modelLocal.setData(dadosModelLocal);
                this.getView().setModel(modelLocal,"modelLocal");
        }
        // onBeforeRendering() {
        //         //Criar a tabela de dados e Model p/ o WORKLIST com as TODAS as Validacoes
        //         // let dadosModelLocal = [];
        //         let modelLocal = new JSONModel();
        //         this.getOwnerComponent().getModel(modelLocal,"modelLocal");
        //         if (!modelLocal.oData?.usuario) {
        //             Core.getModel(modelLocal,"modelLocal");
        //         }
        //         // modelLocal.setData(dadosModelLocal);
        //         this.getView().setModel(modelLocal,"modelLocal");
        // },
    });
});