
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

import psycopg2

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
        
    def gotoTestForm(self):
        self.form_tabcontrol.setCurrentIndex(4)
        
    #PSQL -------------------------------------------------'
    
    #this method is used to gather all the records.
    def selectAllRecords(self):
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
        
        query = 'SELECT patient.id, patient.first_name, patient.mi, patient.last_name, patient.phone_number'
        query +=', address.street, address.city, address.state, address.zip_code'
        query +=' FROM patient inner join address ON patient.id = address.patient_id;'
        
        test = cur.execute(query)
        for record in cur:
            print(record)
        
        
    def selectFilter(self):
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
        
        query = 'SELECT patient.id, patient.first_name, patient.mi, patient.last_name, patient.phone_number'
        query +=', address.street, address.city, address.state, address.zip_code'
        query +=' FROM patient inner join address ON patient.id = address.patient_id'
        query += " where LOWER(patient.first_name) Like '%s';" % ("ant%")
        
        test = cur.execute(query)
        for record in cur:
            print(record)
                
    def insertRecord(self):
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
        
        query = 'INSERT into patient(first_name, mi, last_name, phone_number)'
        query +=" Values('%s', '%s', '%s', '%s') returning id;" %  ('luis', 'A', 'morales', '5089880582')
        
        test = cur.execute(query)
        conn.commit()
        id = 0;
        for record in cur:
            print(record)
            id = record[0]
        
        query = 'INSERT into address(patient_id, street, city, state, zip_code)'
        query +=" Values(%d, '%s', '%s', '%s', '%s') returning id;" %  (id,'522 Propect St', 'Methuen', 'Ma', '01844')
        
        test = cur.execute(query)
        conn.commit()
        id = 0;
        for record in cur:
            print(record)
            id = record[0]
        
    def updateRecord(self):
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
        
        query = "update patient set first_name='%s', mi='%s' , last_name='%s', phone_number='%s' where id =%d;" % ('garbo', 'D', 'Trash', 'DNE', 19)
        test = cur.execute(query)
        conn.commit()
        
        query = "update address set street='%s', city='%s' , state='%s', zip_code='%s' where patient_id =%d;" % ('garbo', 'D', 'Trash', 'DNE', 19)
        test = cur.execute(query)
        conn.commit()
    
    def removeRecord(self):
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
    
        query = "delete from address where patient_id = %d" % (19)
        test = cur.execute(query)
        conn.commit()
    
        query = "delete from patient where id = %d" % (19)
        test = cur.execute(query)
        conn.commit()
        
    
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
        self.testformBTN.clicked.connect(lambda: self.gotoTestForm())
        self.exitBTN.clicked.connect(lambda: self.pressedBack())
        self.sBTN.clicked.connect(lambda: self.selectAllRecords())
        self.sfilterBTN.clicked.connect(lambda: self.selectFilter())
        self.insBTN.clicked.connect(lambda: self.insertRecord())
        self.upBTN.clicked.connect(lambda: self.updateRecord())
        self.remBTN.clicked.connect(lambda: self.removeRecord())
        
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
