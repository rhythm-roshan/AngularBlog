import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourFavComponent } from './your-fav.component';

describe('YourFavComponent', () => {
  let component: YourFavComponent;
  let fixture: ComponentFixture<YourFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
