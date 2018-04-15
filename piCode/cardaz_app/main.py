
#RUN THIS COMMAND ANYTIME THE FORM IN QT CHANGES
#   pyuic5 cardaz_app.ui > cardaz_app.py

#HEY FUTURE TIRED ME!! if the error for can't find pyqtgraph appears
#chang eth cardaz_app.py file to this
#      
#          from pyqtgraph.pyqtgraph import PlotWidget

#needs this always
import sys

#get the qt components
import PyQt5
from PyQt5.QtWidgets import *

from random import *

#get form code.
import cardaz_app

import pyqtgraph as pg

#create class for the GUI
class Form1(QMainWindow, cardaz_app.Ui_cardaz_app):
    
    #define button callback
    def pressedStartButton(self):
        print("first name:  " + self.first_name_TB.text() + "\n")
        print("last name:  " + self.last_name_TB.text() + "\n")
        self.form_tabcontrol.setCurrentIndex(3)
        #print("testing")
    
    #define button callback
    def pressedYes(self):
        self.form_tabcontrol.setCurrentIndex(2)
    
    #define button callback
    def pressedNo(self):
        self.form_tabcontrol.setCurrentIndex(1)
    
    #define button callback
    def pressedBack(self):
        self.form_tabcontrol.setCurrentIndex(0)
        
    #define button callback
    def pressedReady(self):
        self.form_tabcontrol.setCurrentIndex(3)
        pitch = [.0,.200,.300,.400,.500,.600]
        self.heart_graph.plot(pitch)
        
    
    def __init__(self):
        super(self.__class__,self).__init__()
        self.setupUi(self) #defined in the UI file
        self.form_tabcontrol.setCurrentIndex(0)#sets first page
        
        #setup callback functions
        self.execute_BTN.clicked.connect(lambda: self.pressedStartButton())
        self.yesacc_BTN.clicked.connect(lambda: self.pressedYes())
        self.noacc_BTN.clicked.connect(lambda: self.pressedNo())
        self.back_BTN.clicked.connect(lambda: self.pressedBack())
        self.ready_BTN.clicked.connect(lambda: self.pressedReady())
        
        
        
    #main function
def main():
    #make an app
    app = QApplication(sys.argv)
    form = Form1()
    form.show()
    
    #stop auto exit
    sys.exit(app.exec_())
        
if __name__ == "__main__":
    main()
