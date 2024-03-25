import { Component, OnInit } from '@angular/core';
declare var CryptoJS: any;
@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.scss'],
})
export class DecodeComponent implements OnInit {
  data: any = { data: '', decode: '' };
  decode() {
    this.data.decode = this.data.data.split('.').map((d: any) => {
      return JSON.parse(
        CryptoJS.AES.decrypt(d, 'secretkey123').toString(CryptoJS.enc.Utf8)
      );
    });
  }
  constructor() {}

  ngOnInit(): void {}
}
