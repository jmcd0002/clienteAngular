import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariNoRegistradoComponent } from './usuari-no-registrado.component';

describe('UsuariNoRegistradoComponent', () => {
  let component: UsuariNoRegistradoComponent;
  let fixture: ComponentFixture<UsuariNoRegistradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariNoRegistradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariNoRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
