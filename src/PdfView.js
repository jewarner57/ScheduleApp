import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class PdfView extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = ({
           
            pdfVisible: "hidden",
            pdfStyle: "pdfdoc hidden",
            backgroundStyle: "pdfBackground hidden",
            screenWidth: 200,
            backgroundHeight: {height: 200},
            pdfLoaded: false,
            loadingIconClass: "visible loadingIcon",
            
        })
        this.showPDF = this.showPDF.bind(this);
        this.resizeDoc = this.resizeDoc.bind(this);
        this.errorLoadingPDF = this.errorLoadingPDF.bind(this);
        this.pdfDidLoad = this.pdfDidLoad.bind(this);
        this.checkIfPDFLoaded = this.checkIfPDFLoaded.bind(this);
        
        window.addEventListener("resize", this.checkIfPDFLoaded);
    }
    
    checkIfPDFLoaded() {
        
        if(this.state.pdfLoaded === true) {
            this.resizeDoc();
        }
        
    }
    
    resizeDoc() {
        const windowWidth = window.innerWidth;
        const backgroundHeight = windowWidth*(628/444);

        const backgroundStyle = {
            height: backgroundHeight,
        }

        console.log('resized');
        this.setState({screenWidth: window.innerWidth, backgroundHeight: backgroundStyle});
    }
    
    showPDF() {
        
        let currentStyle = this.state.pdfVisible;
        
        if(currentStyle === "hidden") {
            currentStyle = "visible";
        }
        else {
            currentStyle = "hidden";
        }
        
        this.setState({pdfVisible: currentStyle, pdfStyle: "pdfdoc" + " " + currentStyle, backgroundStyle: "pdfBackground" + " " + currentStyle});
    }
    
    errorLoadingPDF() {
        this.setState({pdfLoaded: false, loadingIconClass: "hidden"});
    }
    
    pdfDidLoad() {
        
        this.resizeDoc();
        this.setState({pdfLoaded: true, loadingIconClass: "hidden loadingIcon"});
        
        
    }
    
    render() {

        return (
            <div className="pdfSection">
                
                <div className="pdfButtonContainer">
                    <p>Check out the lunch menu!</p>
                    <div>
                        <RaisedButton
                          className="openPdfButton"
                          label="Lunch Menu"
                          labelPosition="before"
                          secondary={true}
                          onClick={this.showPDF}
                        />
                    </div>
                </div>

            
                    <div className={this.state.backgroundStyle} style={this.state.backgroundHeight}>
                        
                        <CircularProgress size={80} thickness={5} className={this.state.loadingIconClass}/>
                        
                        <div className={this.state.pdfStyle}>

                            <Document file="https://cors-anywhere.herokuapp.com/http://harrisonburg.k12.va.us/HarrisonburgCitySchools/media/images/HHS_4-23-18_.pdf" onLoadError = {this.errorLoadingPDF} onLoadSuccess = {this.pdfDidLoad} error="Couldn't Load Lunch Menu" loading="">

                                <Page pageNumber={1} width={this.state.screenWidth}/>

                            </Document> 

                        </div>
            
                    </div>
            
            </div>
        )
    }
}