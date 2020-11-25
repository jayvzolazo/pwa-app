import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { SignaturePadOptions } from '@williamsrivas/ngx-signature-pad';

enum IMG_TYPE {
  png,
  jpg
}

@Component({
  selector: 'app-camera-profiling',
  templateUrl: './camera-profiling.component.html',
  styleUrls: ['./camera-profiling.component.scss']
})
export class CameraProfilingComponent implements OnInit {

  @ViewChild('signaturePad', { static: false }) signaturePad;

  imageType: typeof IMG_TYPE = IMG_TYPE;

  width = 300;
  height = 400;
  options: SignaturePadOptions = { trimSignature: true, trimMargin: 20 };
  signatureCanvasWidth: any = window.innerWidth - 32;
  // by default, set to PNG
  signImgType: any = this.imageType.png;

  /*
   * Camera Algo
   *
   */
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId: string;
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  errors: WebcamInitError[] = [];
  imageFileName: string;

  // latest snapshot
  webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor() { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  private generateFileName(): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let length = 32;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private generateImgUrl(data: any): any {
    let url = data.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    return url;
  }

  public triggerSnapshot(): void {
    this.showWebcam = false;
    this.trigger.next();
    // generate random image filename
    this.imageFileName = this.generateFileName();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  triggerSnapshotAgain(): void {
    this.webcamImage = null;
    this.showWebcam = true;
  }

  saveSnapshot(): void {
    let url = this.generateImgUrl(this.webcamImage.imageAsDataUrl);
    window.open(url);
  }

  /**
   * Signature algo
   */
  isEmpty(): void {
    // console.log('is empty', this.signaturePad.isEmpty());
  }

  saveSignature(): void {
    let dataUrl;
    let imgType: string = '';

    switch (this.signImgType) {
      case this.imageType.png:
        dataUrl = this.signaturePad.toDataURL();
        imgType = 'png';
        break;
      case this.imageType.jpg:
        dataUrl = this.signaturePad.toDataURL('image/jpeg');
        imgType = 'jpg';
        break;
      default:
        break;
    }

    let signUrl: any = this.generateImgUrl(dataUrl);
    let fileName: string = this.generateFileName();
    // create link
    let aElem = document.createElement('a');
    document.body.appendChild(aElem);
    aElem.download = `${fileName}.${imgType}`;
    aElem.href = signUrl;
    aElem.click();
  }

  // savePng(): void {
  //   if (this.signaturePad.isEmpty()) {
  //     alert('Please put your signature');
  //   } else {
  //     const data = this.signaturePad.toDataURL();
  //     let signUrl: any = this.generateImgUrl(data);
  //     let fileName: string = this.generateFileName();
  //     // create link
  //     let aElem = document.createElement('a');
  //     document.body.appendChild(aElem);
  //     aElem.download = `${fileName}.png`;
  //     aElem.href = signUrl;
  //     aElem.click();
  //   }
  // }

  // saveJpg(): void {
  //   if (this.signaturePad.isEmpty()) {
  //     alert('Please put your signature');
  //   } else {
  //     const data = this.signaturePad.toDataURL('image/jpeg');
  //     // console.log(data);
  //     let signUrl: any = this.generateImgUrl(data);
  //     let fileName: string = this.generateFileName();
  //     // create link
  //     let aElem = document.createElement('a');
  //     document.body.appendChild(aElem);
  //     aElem.download = `${fileName}.jpg`;
  //     aElem.href = signUrl;
  //     aElem.click();
  //   }
  // }

  // saveSvg(): void {
  //   const data = this.signaturePad.toDataURL('image/svg+xml');
  //   console.log(data);
  // }

  // saveArray(): void {
  //   const data = this.signaturePad.toData();
  //   console.log(data);
  //   console.log(JSON.stringify(data));
  // }

  clear(): void {
    console.log('clear');
    this.signaturePad.clear();
  }

  changeOptions(type: any): void {
    console.log('options changed');
    // this.options = {
    //   minWidth: 5,
    //   maxWidth: 10,
    //   penColor: 'rgb(66, 133, 244)'
    // };
    this.options = {};
    this.signImgType = type;

    switch (type) {
      case this.imageType.png:
        // transparent blank
        this.options['backgroundColor'] = 'rgba(0,0,0,0)';
        break;
      case this.imageType.jpg:
        // opaque white
        this.options['backgroundColor'] = 'rgb(255, 255, 255)';
        break;
      default:
        break;
    }
  }

  undoSign(): void {
    let data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }
}
