module poo {
    requires javafx.controls;
    requires javafx.fxml;

    opens poo to javafx.fxml;
    exports poo;
}
