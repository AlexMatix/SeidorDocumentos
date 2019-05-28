package com.example.proyectografica;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

public class MainActivity extends AppCompatActivity {
    LineGraphSeries<DataPoint> series;
    GraphView graph;

    Button calcule;

    EditText speedIni;
    EditText grade;
    TextView log;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //init object visual
        graph    = (GraphView) findViewById (R.id.graph);
        series   = new LineGraphSeries<DataPoint>();
        speedIni = (EditText) findViewById(R.id.speed);
        grade    = (EditText) findViewById(R.id.grade);
        log      = (TextView) findViewById(R.id.log);
        calcule  = (Button) findViewById(R.id.calcule);

        calcule.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                calculeFunction();
            }
        });
    }

    public void calculeFunction(){
        graph.removeAllSeries();
        series.resetData(new DataPoint[]{});

        Double speed  = Double.parseDouble(speedIni.getText().toString());
        Double grades = Double.parseDouble(grade.getText().toString());
        Double speedX = speed * Math.cos(Math.toRadians(grades));
        Double speedY;
        Double height;
        Double displacement;
        Double heightMax = 0.0;
        speedY = speed * Math.sin(Math.toRadians(grades));
        Double time = ((speedY * 2.0) / -9.8) * -1;
        Integer iterator = (int) Math.round(time) * 2;
        Double timeIterator = 0.5;
        for(int i = 0; i < iterator; i++){
            height = (speedY * timeIterator) + (0.5 * (- 9.8)) * Math.pow(timeIterator, 2);
            displacement = speedX * timeIterator;
            heightMax =  Math.pow(speedY, 2) / 19.6;
            series.appendData(new DataPoint(displacement, height), true, 500);
            timeIterator += 0.5;
        }
        Double displacementMax = speedX * time;

        log.setText("Altura Maxima --> " + heightMax.toString() +
                "\n Tiempo --> " + time.toString() +
                "\n Desplazamiento Máximo --> " + displacementMax.toString());
        graph.addSeries(series);
    }

}
