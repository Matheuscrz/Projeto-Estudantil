/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package poo.ufs.grafico.sisu;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
/**
 *
 * @author matheuslima
 */
public class Json {
    public static void main(String[] args) {
        String input = "ADMINISTRACAO"; //Curso pesquisado
        List<String> listCurse = new ArrayList<>(); //Lista que recebera todos cursos do JSON
        List<Double> notas = new ArrayList<>();
        JSONParser jsonParser = new JSONParser();
        try(FileReader reader = new FileReader("Data.json")){
            Object obj = jsonParser.parse(reader); //Função que ler o JSON
            JSONArray dataArray = (JSONArray) obj; 
            dataArray.forEach(data -> listaCurso((JSONObject)data, listCurse));
            if(verificaCurso(listCurse,input)){
                notas.clear();
                dataArray.forEach(data -> parserProgram((JSONObject)data, input, notas));
                Intervalo(notas, nClasses(notas));
            }
            else System.out.println("Curso não encontrado");
        }catch(Exception e) { 
            System.out.println(e);
        }
    }
    //Função que gera uma lista de notas de um determinado curso passado
    private static void parserProgram(JSONObject data, String input, List<Double> aux){
        Double temp;
        if(input.equals(data.getOrDefault("CURSO", input))){
            temp = Double.parseDouble(data.get("NOTA").toString());
            aux.add(temp);
        }
    }
    //Função que gera uma lista com todos os cursos armazenados no JSON
    private static void listaCurso(JSONObject data, List<String> cursos){
        String auxS;
        auxS = (String) data.get("CURSO");
        cursos.add(auxS);
    }
    //Função que verifica se o valor do input corresponde a algum curso
    private static boolean verificaCurso(List<String> cursos, String input){
        for(String value : cursos) {
            if(input.equals(value)) return true;
        }
        return false;
    }
    //Função que retorna o Intervalo entre as classes
    private static double Intervalo(List<Double> notas, int classes) {
        //Maior valor
        Double maxValue = 0d;
        for(Double value: notas){
            if(value > maxValue) maxValue = value;
        }
        //Menor valor
        Double minValue = maxValue;
        for(Double value: notas){
            if(value < minValue) minValue = value;
        }
        //(Maior - Menor) / nClasses
        double interv = (maxValue - minValue)/classes;
        BigDecimal bd = new BigDecimal(interv).setScale(2, RoundingMode.HALF_EVEN);
        return bd.doubleValue();
    }
    //Metodo que retorna o numero de classes do grafico
    private static int nClasses(List<Double> notas) {
        double prov = Math.round(Math.sqrt(notas.size()));
        return (int) prov;
    }
}
