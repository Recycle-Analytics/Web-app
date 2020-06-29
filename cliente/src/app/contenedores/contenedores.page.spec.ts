import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContenedoresPage } from './contenedores.page';

describe('ContenedoresPage', () => {
  let component: ContenedoresPage;
  let fixture: ComponentFixture<ContenedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
