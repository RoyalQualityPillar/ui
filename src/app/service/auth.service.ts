import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  getAuth(userid:any,password:any){
    console.log(userid);
    let loginURL='http://103.10.234.106:8081/authenticate'
    let authData=userid+':'+password;
    let encodedAuthData=btoa(authData);
    //console.log(encodedAuthData1)
   //let test ='cnEyMDAxMDA6d2VsY29tZQ==';
  // let username1='rd200100';
   //let password1='welcome';
//let encodedAuthData=`Basic ${encodedAuthData1}`
   // console.log(authData)
   // console.log(encodedAuthData);
   // console.log(btoa(+username1+':'+password1))
   // console.log(btoa('rd200100:welcome'))
    console.log(encodedAuthData)
    const httpOptions = {
      headers: new HttpHeaders({      
       // 'Authorization': encodedAuthData 
       'Content-Type':  'application/json',
       //'Authorization': 'Basic ' + btoa('rd200100:welcome')
       'Authorization': 'Basic ' + encodedAuthData
      })
    };
//this.http.get('url',httpOptions);
return this.http.post(loginURL,'',httpOptions)
}
}
