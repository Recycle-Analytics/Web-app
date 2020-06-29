import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatVehiculosPage } from './stat-vehiculos.page';

describe('StatVehiculosPage', () => {
  let component: StatVehiculosPage;
  let fixture: ComponentFixture<StatVehiculosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatVehiculosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
