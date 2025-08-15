import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}

export interface Auth {
  id: string;
}
