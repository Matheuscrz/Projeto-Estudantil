module poo.ufs {
    requires javafx.controls;
    requires javafx.fxml;

    opens poo.ufs to javafx.fxml;
    exports poo.ufs;
}
