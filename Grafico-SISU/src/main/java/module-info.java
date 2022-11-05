module poo.ufs.grafico.sisu {
    requires javafx.controls;
    requires javafx.fxml;

    opens poo.ufs.grafico.sisu to javafx.fxml;
    exports poo.ufs.grafico.sisu;
}   
