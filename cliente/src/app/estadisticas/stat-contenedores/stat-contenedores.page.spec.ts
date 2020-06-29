import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatContenedoresPage } from './stat-contenedores.page';

describe('StatContenedoresPage', () => {
  let component: StatContenedoresPage;
  let fixture: ComponentFixture<StatContenedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatContenedoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatContenedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
