
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
import pyqtgraph.pyqtgraph as pg
import psycopg2
import time
import numpy as np
import socket
import struct
import array

UDP_IP = "0.0.0.0" #change to needed ip.
UDP_PORT = 9000

#create class for the GUI
class Form1(QMainWindow, cardaz_app.Ui_cardaz_app):
    
    #define button callback
    def pressedStartButton(self):
        print("first name:  " + self.first_name_TB.text() + "\n")
        print("last name:  " + self.last_name_TB.text() + "\n")
        
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
        #insert into patient
        query = "insert into patient(first_name, mi, last_name, phone_number)"
        query +=" Values('%s', '%s', '%s', '%s') returning id;" % (self.first_name_TB.text(), self.mi_TB.text(), self.last_name_TB.text(), self.phone_TB.text())
        
        test = cur.execute(query)
        conn.commit()
        id = 0;
        for record in cur:
            print(record)
            id = record[0]
        
        #insert into address
        query = "insert into address(patient_id, street, city, state, zip_code)"
        query +=" Values(%d, '%s', '%s', '%s', '%s') returning id;" % (id , self.street_TB.text(), self.street_TB_2.text(), self.state_CB.currentText(), self.phone_TB_2.text())
        
        test = cur.execute(query)
        conn.commit()
        for record in cur:
            print(record)
            id = record[0]
        
        self.pressedYes()
        #print("testing")
    
    #When the user has pressed the "login button"
    def pressedYes(self):
        self.form_tabcontrol.setCurrentIndex(2)
        
        conn = psycopg2.connect(host='localhost', database='cardaz', user='antonio', password='19528974')
        print("connecting to PSQL database")
        cur = conn.cursor()
        
        query = 'SELECT patient.id, patient.first_name, patient.mi, patient.last_name, patient.phone_number'
        query +=', address.street, address.city, address.state, address.zip_code'
        query +=' FROM patient inner join address ON patient.id = address.patient_id;'
        
        item = QListWidgetItem("id\t fName \t LName \t Street \t\t City \t\t ZipCode")
        self.listWidget.addItem(item)
        
        test = cur.execute(query)
        for record in cur:
            print(record)
            item = QListWidgetItem("" + str(record[0]) + "\t" + record[1] +"\t" + record[3]  +"\t" + record[5]  +"\t" + record[6] +"      \t" + record[8] )
            self.listWidget.addItem(item)
            self.listWidget.show()
    
    
    pw = None
    data = None
    curve = None
    i = 0
    #define button callback
    #occurs when the user presses ready to start the heartbeat test
    def pressedReady(self):
        
        #if the user hasn't picked an account then don't continue the test
        if(self.listWidget.currentRow() == -1):
            return
        
        #find the id of the selected account for storing the heart data later.
        idtext = self.listWidget.currentItem().text()
        print( idtext[0: (idtext.find("\t")) ] )
        
        #clear the list to avoid multiple record insertions
        self.listWidget.clear()        
        self.form_tabcontrol.setCurrentIndex(3)
        #time.sleep(3)
        
        #Set up the parameters for the graph
        pw = self.heart_graph
        bufferSize = 1000
        
        global curve, line, data, i
        data = []
        curve = pw.plot()
        line = pw.addLine(x=0)
        pw.setRange(xRange =[0,200], yRange=[0000,1000])
        i=0
        
        #testing stuff, but this is how to plot data boiii
        #TODO: if you hit back it will save the plot, and never delete even when a re run occurs
        while True:
            
            timer = pg.QtCore.QTimer()
            timer.timeout.connect(self.updateGraph)
            timer.start(.8) #TODO: Doesn't stop ever.
            pg.QtGui.QApplication.processEvents()
    
    
    def updateGraph(self):
        global data, curve, i, line
        #data = [1,2,3,4,5,5,6,7,8,9]
        
        #here is where the UDP listener goes
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind((UDP_IP, UDP_PORT))
        dataudp, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
        print ("received message:", dataudp)
        sock.close()
        
        
        #strarr = dataudp.split(',',1)
        numarr = []
            
            #numarr= int.from_bytes(dataudp, byteorder='big', signed = True)
        
        strtemp = dataudp.decode("utf-8")
        strtemp = strtemp[:-1]
        print(strtemp)
        arrtemp = strtemp.split(',')
        integers=[]
        print (strtemp)
        print(arrtemp)
        for j in range(0,len(arrtemp)):
            integers.append(int(arrtemp[j]))
            time.sleep(.0005)
       
        n = 1000
        rand = np.random.randint(-50, 50)
        #data.append(np.clip(int(arrtemp[0]), -50,50))
        data = data + integers
        
        curve.setData(data)
        i=(i+100)
        line.setValue(20)
        n = n +1
        if i > 100:
            self.heart_graph.setRange(xRange =[i -300,i+300], yRange=[100,2000])
        #time.sleep(.005)
        #then since it will probably be a pact of int data, for loop to graph
   
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
        
        arrs = np.array([17,24,121,1,12,222,34,76])
        
        sss = array.array('B',arrs).tostring()
        print(sss)
        
        hexstr = ''.join('{:2x}'.format(i) for i in arrs)
        
        #INSERT INTO heartdata(patient_id, bpm, raw_heart_data) Values(21, 73,
        #( select decode(replace('111879 1 cde224c', ' ', ''), 'hex') )  );

        
        query = 'INSERT into heartdata(patient_id, bpm, raw_heart_data)'
        query += " values(21, 555, ( select decode(replace('%s', ' ', ''), 'hex') )  );" % hexstr
 
        #query +=" Values('%s', '%s', '%s', '%s') returning id;" %  ('luis', 'A', 'morales', '5089880582')
        print('query:   ' + query)
        
        test = cur.execute(query)
        conn.commit()
        id = 0;
        for record in cur:
            print(record)
            id = record[0]
        
        #query = 'INSERT into address(patient_id, street, city, state, zip_code)'
        #query +=" Values(%d, '%s', '%s', '%s', '%s') returning id;" %  (id,'522 Propect St', 'Methuen', 'Ma', '01844')
        

        
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
