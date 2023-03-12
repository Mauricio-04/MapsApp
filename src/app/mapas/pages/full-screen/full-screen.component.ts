import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {
  ngOnInit(): void {
const map = new mapboxgl.Map({
container: 'mapa',
style: 'mapbox://styles/mapbox/streets-v12',
zoom: 16, // starting zoom
center:[-85.5859966368374,10.259451666210614]
});
  }

}
