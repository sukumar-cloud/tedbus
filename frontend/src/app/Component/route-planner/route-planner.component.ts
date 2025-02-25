import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import OpenRouteService from 'openrouteservice-js';

@Component({
  selector: 'app-route-planner',
  template: `
    <div>
      <label>Start:</label>
      <input type="text" [(ngModel)]="startLocation" placeholder="Enter start location">
      <label>End:</label>
      <input type="text" [(ngModel)]="endLocation" placeholder="Enter end location">
      <button (click)="calculateRoute()">Plan Route</button>
    </div>
    <div id="map" style="height: 500px;"></div>
  `,
  styleUrls: ['./route-planner.component.css']
})
export class RoutePlannerComponent implements AfterViewInit {
  private map!: L.Map;
  private routingControl!: L.Routing.Control;
  startLocation = "28.6139,77.2090"; // Default: Delhi
  endLocation = "28.5355,77.3910"; // Default: Noida

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  calculateRoute() {
    const startCoords = this.startLocation.split(",").map(Number);
    const endCoords = this.endLocation.split(",").map(Number);

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startCoords[0], startCoords[1]),
        L.latLng(endCoords[0], endCoords[1])
      ],
      routeWhileDragging: true
    }).addTo(this.map);

    this.getAlternativeRoutes(startCoords, endCoords);
  }

  getAlternativeRoutes(start: number[], end: number[]) {
    const ors = new OpenRouteService({ api_key: 'YOUR_API_KEY' });
    ors.directions({
      coordinates: [[start[1], start[0]], [end[1], end[0]]],
      profile: 'driving-car',
      format: 'geojson',
      alternative_routes: { target_count: 2 }
    }).then(data => {
      L.geoJSON(data).addTo(this.map);
    });
  }
}
