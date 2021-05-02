import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl = environment.urlServer;
  modal = new BehaviorSubject(false);
  sizeScreen = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  postData() {
    return this.http.get(
      `${this.baseUrl}/${environment.postDataCountry}`,
      httpOptions
    );
  }

  postDataCountry(country) {
    return this.http.post(
      `${this.baseUrl}/${environment.postDataCountry}`,
      JSON.stringify(country),
      httpOptions
    );
  }

  getIncidenciaInCountries() {
    return this.http.get(
      `${this.baseUrl}/${environment.getIncidenciaInCountries}`,
      httpOptions
    );
  }

  /**
   * Guarda una Hoja de Rentabilidad.
   * @param sheetMain Hoja de Rentabilidad a guardar.
   */
  /*postProfitabilitySheetMain(sheetMain: ProfitabilitySheetMain) {
    return this.http.post(
      `${this.baseUrl}/postProfitabilitySheetMain`,
      JSON.stringify(sheetMain),
      httpOptions
    );
  }*/
  getModal()
  {
      return this.modal.asObservable();
  }
  setModal(val)
  {
      this.modal.next(val)
  }
  getSizeScreen()
  {
      return this.sizeScreen.asObservable();
  }
  setSizeScreen(val)
  {
      this.sizeScreen.next(val)
  }
}
