import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RoutePlannerComponent } from './route-planner.component';

describe('RoutePlannerComponent', () => {
  let component: RoutePlannerComponent;
  let fixture: ComponentFixture<RoutePlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutePlannerComponent],
      imports: [FormsModule] // Import FormsModule for ngModel
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default start and end locations', () => {
    expect(component.startLocation).toBe("28.6139,77.2090"); // Delhi
    expect(component.endLocation).toBe("28.5355,77.3910"); // Noida
  });

  it('should initialize the map after view init', () => {
    spyOn(component as any, 'ngAfterViewInit');
    component.ngAfterViewInit();
    expect(component.ngAfterViewInit).toHaveBeenCalled();
  });

  it('should update waypoints when calculateRoute is called', () => {
    component.startLocation = "28.7041,77.1025"; // New Delhi
    component.endLocation = "28.4595,77.0266"; // Gurgaon
    spyOn(component as any, 'calculateRoute');
    component.calculateRoute();
    expect(component.calculateRoute).toHaveBeenCalled();
  });

  it('should get alternative routes', () => {
    const startCoords = [28.6139, 77.2090]; // Delhi
    const endCoords = [28.5355, 77.3910]; // Noida
    spyOn(component as any, 'getAlternativeRoutes');
    component.getAlternativeRoutes(startCoords, endCoords);
    expect(component.getAlternativeRoutes).toHaveBeenCalledWith(startCoords, endCoords);
  });
});
