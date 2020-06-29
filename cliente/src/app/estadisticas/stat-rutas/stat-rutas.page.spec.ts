import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatRutasPage } from './stat-rutas.page';

describe('StatRutasPage', () => {
  let component: StatRutasPage;
  let fixture: ComponentFixture<StatRutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatRutasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatRutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
