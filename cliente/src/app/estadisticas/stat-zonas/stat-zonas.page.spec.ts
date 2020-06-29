import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatZonasPage } from './stat-zonas.page';

describe('StatZonasPage', () => {
  let component: StatZonasPage;
  let fixture: ComponentFixture<StatZonasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatZonasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatZonasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
