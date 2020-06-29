import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContPage } from './cont.page';

describe('ContPage', () => {
  let component: ContPage;
  let fixture: ComponentFixture<ContPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
