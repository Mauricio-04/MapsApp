import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?:[number,number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel:number = 15;
  center: [number,number] = [-85.5859966368374,10.259451666210614];

  //Arreglo de marcadores
  marcadores:MarcadorColor[] = [];


  ngAfterViewInit(): void {
    console.log('AfterViewInit',this.divMapa);
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: this.zoomLevel,
    center:this.center
    });
    this.leerLocalStorage();
  
    // const markerHtml:HTMLElement = document.createElement('div');
    // markerHtml.innerHTML= 'Hola Mundo';

    //  new mapboxgl.Marker()
    // .setLngLat(this.center)
    // .addTo(this.mapa)
    
  }
  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
     const nuevoMarcador = new mapboxgl.Marker({
      draggable:true,
      color:color
     })
     .setLngLat(this.center)
     .addTo(this.mapa);
     
     this.marcadores.push({
      color,
      marker:nuevoMarcador
     });
     this.guardarMarcadoresLocalStorage();
     nuevoMarcador.on('dragend',() => {
      this.guardarMarcadoresLocalStorage();
     });
  }
  irMarcador(marker :mapboxgl.Marker){
     this.mapa.flyTo({
      center:marker.getLngLat()
     })
  }
  guardarMarcadoresLocalStorage(){
    const lngLatArr:MarcadorColor[] = [];
      this.marcadores.forEach( m => {
        const color = m.color;
        const {lng,lat} = m.marker!.getLngLat();

        lngLatArr.push({
          color:color,
          centro:[lng,lat]
        });
      })
      localStorage.setItem('marcadores',JSON.stringify(lngLatArr));
  }
  leerLocalStorage(){

    if(!localStorage.getItem('marcadores')){
      return;
    }

     const lngLatArr:MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
     
     lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);

      this.marcadores.push({
        marker:newMarker,
        color:m.color
      });

      newMarker.on('dragend',() => {
       this.guardarMarcadoresLocalStorage();
      });


     })
     
  }
  borrarMarcador(i:number){
  this.marcadores[i].marker?.remove();
  this.marcadores.splice(i,1);
  this.guardarMarcadoresLocalStorage();
  }
 
}
