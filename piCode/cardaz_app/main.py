
#RUN THIS COMMAND ANYTIME THE FORM IN QT CHANGES
#   pyuic5 cardaz_app.ui > cardaz_app.py


#needs this always
import sys

#get the qt components
import PyQt5
from PyQt5.QtWidgets import *

#get form code.
import cardaz_app

#create class for the GUI
class Form1(QMainWindow, cardaz_app.Ui_cardaz_app):
    
    #define button callback
    def pressedStartButton(self):
        print(self.first_name_TB.text())
        #print("testing")
    
    
    def __init__(self):
        super(self.__class__,self).__init__()
        self.setupUi(self) #defined in the UI file
        
        #setup callback functions
        self.execute_BTN.clicked.connect(lambda: self.pressedStartButton())
        
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
