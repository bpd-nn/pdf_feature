sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "jspdf"
], function (Controller, MessageToast, JSONModel, jpdf) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            this.orderCounter = 1;
            var oData = { Orders: [] };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "orderModel");
            this.pdfcount = 0;
        },

        onPressButton: function () {
            MessageToast.show("Button Clicked! Adding Order...");
        
            var oModel = this.getView().getModel("orderModel");
            var aOrders = oModel.getProperty("/Orders") || [];
        
            var newOrder = {
                Order: "O" + this.orderCounter,
                Status: this.getRandomStatus() 
            };
        
            aOrders.push(newOrder);
            oModel.setProperty("/Orders", aOrders);
            this.orderCounter++;
        },
        
        getRandomStatus: function () {
            const statuses = ["Processing", "Pending", "Completed"];
            return statuses[Math.floor(Math.random() * statuses.length)];
        },

        onGeneratePDF: function () {
            // const doc = new jpdf();
            // doc.text("Bhuvanitha Priyadharshini", 10, 10);
            // doc.save("a4.pdf"); 
            // var base64String = doc.output("datauristring").split(",")[1];
            // this.byId("base64_string").setText(base64String);
            const doc = new jpdf();
            doc.text("Order List", 10, 10);
            var oModel = this.getView().getModel("orderModel");
            var aOrders = oModel.getProperty("/Orders") || [];
        
            let startX = 10;
            let startY = 20;
            let rowHeight = 10;
            let col1Width = 40;
            let col2Width = 50;

            doc.text("Order ID", startX, startY);
            doc.text("Status", startX + col1Width, startY);
            doc.line(startX, startY + 2, startX + col1Width + col2Width, startY + 2);
            aOrders.forEach((order, index) => {
                let yPos = startY + (index + 1) * rowHeight;
                doc.text(order.Order, startX, yPos);
                doc.text(order.Status, startX + col1Width, yPos);
            });
        
            doc.save("Orders"+ this.pdfcount+".pdf");
            this.pdfcount = this.pdfcount + 1;
            var base64String = doc.output("datauristring").split(",")[1];
            this.byId("base64_string").setText(base64String);
        }
        
    });
});
