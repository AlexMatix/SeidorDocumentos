package com.example.proyectografica;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

public class MainActivity extends AppCompatActivity {
    LineGraphSeries<DataPoint> series;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //get Item visual
        GraphView graph= (GraphView) findViewById (R.id.graph);

        //TODO get values for user
        Double speed;
        Double grades;

        Double speedX;

        //TODO calcule values in bucle
        Double speedY;
        Double height;
        Double displacement;
        Double time = 12.0;


        int iterator = (int) Math.round(time) * 2;

        series= new LineGraphSeries<DataPoint>();
//        series.appendData(new DataPoint(x, y), true, 500);

        for(int i = 0; i < iterator; i++){

        }

        graph.addSeries(series);
    }
}
