import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit,OnInit,OnDestroy{

  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel:number = 10;
  center: [number,number] = [-85.5859966368374,10.259451666210614];

 constructor(){
  console.log('constructor',this.divMapa);
 }
  ngOnDestroy(): void {
    this.mapa.off('zoom',() => {});
    this.mapa.off('zoomend',() => {});
    this.mapa.off('move',() => {});
  }
  ngOnInit(): void {
    console.log('OnInit',this.divMapa);
  }
  ngAfterViewInit(): void {
    console.log('AfterViewInit',this.divMapa);
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: this.zoomLevel,
    center:this.center
    });

    this.mapa.on('zoom',(ev) => {
    this.zoomLevel = this.mapa.getZoom();
    });
    this.mapa.on('zoomend',(ev) => {
     if(this.mapa.getZoom() > 18){
      this.mapa.zoomTo(18);
     }
      });

      this.mapa.on('move',(event) =>{
        const target = event.target;
        const {lng,lat} = target.getCenter();
        this.center = [lng,lat];
      })

      }
  zoomOut(){
    this.mapa.zoomOut();
    console.log('ZoomOut',this.divMapa);
    }
  zoomIn(){
    this.mapa.zoomIn();
      }
  zoomCambio(valor:string)
  {
    this.mapa.zoomTo(Number(valor));
  }
}
