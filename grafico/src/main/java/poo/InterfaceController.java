package poo;

import javafx.fxml.FXML;
import javafx.scene.chart.BarChart;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;


public class PrimaryController {

    @FXML
    private AnchorPane button;

    @FXML
    private TextField input;

    @FXML
    private BarChart<?, ?> grafico;

    @FXML
    void click(ActionEvent event) {
        System.out.println("Click");
    }
}
