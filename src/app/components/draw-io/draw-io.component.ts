import { Component, OnInit, ViewChild, ElementRef, Renderer2, Directive } from '@angular/core';


@Component({
  selector: 'app-draw-io',
  templateUrl: './draw-io.component.html',
  styleUrls: ['./draw-io.component.css']
})
export class DrawIOComponent implements OnInit {

  @ViewChild('imageDraw', { static: false }) imageDraw!: ElementRef;
  @ViewChild('exampleText', { static: true }) exampleText: ElementRef | undefined;
  @ViewChild('iframe', { static: true }) iframe: ElementRef | undefined;
  @ViewChild('dataCells', { static: true }) dataCells: ElementRef | undefined;
  @ViewChild('dataCellsCount', { static: true }) dataCellsCount: ElementRef | undefined;


  // @Directive({
  //   selector:['myImg']
  // })

  constructor(private renderer: Renderer2) { }

  editor = 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json&returnbounds=1';
  initialDataDrawIo: string = "data:image/png;base64,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";

  //  dataLocal?:localData;

  edit() {
    console.log("function edit()")

    this.renderer.setStyle(this.iframe?.nativeElement, 'display', 'initial')

    window.addEventListener('message', (evt) => {

      if (evt.data.length > 0) {
        let msg = JSON.parse(evt.data);
        // console.log("event.data at angular nhan dc = " + JSON.stringify(evt.data))
        // console.log("msg.evnt = " + msg.event)
        if (msg.event == 'init') {

          // console.log("nhan duoc event init roi")
          if (localStorage.getItem('dataImgAfterExport') != null) {
            this.iframe?.nativeElement.contentWindow.postMessage(JSON.stringify(
              {
                action: 'load',
                xmlpng: this.initialDataDrawIo,
                autosave: 1
              })
              , '*')
          }
          else {
            // console.log("local null")
            // console.log("xmlpng = " + this.initialDataDrawIo)
            this.iframe?.nativeElement.contentWindow.postMessage(JSON.stringify
              ({
                action: 'load',
                autosave: 1,
                xmlpng: this.initialDataDrawIo //base 64 img
              })
              , '*')
          }
        }
        else if (msg.event == 'save') {
          // console.log("nhan duoc event save roi")
          this.iframe?.nativeElement.contentWindow.postMessage(JSON.stringify({
            action: 'export',
            format: 'xmlpng',
            xml: msg.xml,
            spin: 'Updaing page'
          }), '*')
          localStorage.setItem('draft_Temp', JSON.stringify({ xml: msg.xml }))
        }
        else if (msg.event == 'export') {
          this.renderer.setAttribute(this.imageDraw?.nativeElement, 'src', msg.data)
          // console.log("msg.data = " + msg.data)
          localStorage.setItem('dataImgAfterExport', JSON.stringify(msg.data))
          localStorage.removeItem('draft_Temp')

          // this.iframe?.nativeElement.contentWindow.postMessage(JSON.stringify({
          //   event:"updateCells",
          //   data:{
          //     id:10,
          //     label:"this label is changed"
          //   }
          // }))

          this.renderer.setStyle(this.iframe?.nativeElement, 'display', 'none')
        }
        else if (msg.event == 'exit') {
          localStorage.removeItem('draft_Temp')
          this.renderer.setStyle(this.iframe?.nativeElement, 'display', 'none')
        }
        else if (msg.event == "dataCells") {
          // localStorage.setItem('dataImgAfterExport',JSON.stringify(msg.data))
          let dataC = JSON.stringify(msg.dataCells)
          console.log("angular nhan dc datacells  dataCdataCdataC= " + dataC)
          // console.log("angular nhan dc datacells  dataCdataCdataC  count = " + dataC.dataCells)

          this.renderer.setProperty(this.dataCells?.nativeElement, 'innerHTML', msg.dataCells)
          // mockDataCells = JSON.parse(msg.dataCells)

            this.iframe?.nativeElement.contentWindow.postMessage(JSON.stringify({
            event:"updateCells",
            data:{
              id:307,
              label:"this label is changed"
            }
          }),'*')
        }
      }
    });
  }


  async start() {
    console.log("function start()")
    let currentData = await localStorage.getItem("dataImgAfterExport")
    // console.log("currentData = " + currentData)

    if (currentData != null) {
      // console.log("current data not nul")

      let entry = await JSON.parse(currentData)
      // console.log("entry = " + entry)
      this.initialDataDrawIo = entry
      // console.log("initialDataDrawIo = " + this.initialDataDrawIo)
      this.renderer.setAttribute(this.imageDraw.nativeElement, 'src', entry.data)
    }
    await this.edit()
  }

  async udateCells(){
    this.renderer.setStyle(this.iframe?.nativeElement, 'display', 'initial')

    await this.start();
    await this.iframe?.nativeElement.contentWindow.postMessage(JSON.stringify({
      event:"updateCells",
      data:{
        id:"307",
        label:"this label is changed"
      }
    }),'*')
    // console.log("event = "+JSON.stringify({
    //   event:"updateCells",
    //   data:{
    //     id:10,
    //     label:"this label is changed"
    //   }
    // }))
    // var popss = window.open();
    // popss?.postMessage(JSON.stringify({
    //   event:"updateCells",
    //   data:{
    //     id:10,
    //     label:"this label is changed"
    //   }
    // }),'*')
  }

  // testObser():void{
  //   this._DataDraw.getDataByObser2()
  //   .subscribe(dataObser=>this.dataLocal = dataObser)
  // }

  ngOnInit(): void {
    // this.testObser();

    // window.addEventListener('hashchange',this.start);
  }
  ngAfterViewInit() {
    this.start()
  }

}
