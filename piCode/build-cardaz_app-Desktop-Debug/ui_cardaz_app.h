/********************************************************************************
** Form generated from reading UI file 'cardaz_app.ui'
**
** Created by: Qt User Interface Compiler version 5.7.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CARDAZ_APP_H
#define UI_CARDAZ_APP_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QGraphicsView>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QListWidget>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_cardaz_app
{
public:
    QWidget *centralWidget;
    QStackedWidget *form_tabcontrol;
    QWidget *login_form;
    QLabel *label;
    QPushButton *yesacc_BTN;
    QPushButton *noacc_BTN;
    QWidget *P_info_form;
    QLineEdit *first_name_TB;
    QLabel *fname_label;
    QLineEdit *last_name_TB;
    QLabel *lname_label;
    QLineEdit *mi_TB;
    QLabel *mi_label;
    QLineEdit *phone_TB;
    QLabel *phone_Label;
    QLabel *zipcode_Label;
    QLabel *street_Label;
    QLabel *state_Label;
    QLineEdit *phone_TB_2;
    QLabel *city_Label;
    QLineEdit *street_TB;
    QComboBox *state_CB;
    QLineEdit *street_TB_2;
    QLabel *titlelLabel;
    QPushButton *execute_BTN;
    QWidget *page;
    QListWidget *listWidget;
    QLabel *start_info_Label;
    QPushButton *ready_BTN;
    QWidget *page_2;
    QPushButton *back_BTN;
    QGraphicsView *heart_graph;

    void setupUi(QMainWindow *cardaz_app)
    {
        if (cardaz_app->objectName().isEmpty())
            cardaz_app->setObjectName(QStringLiteral("cardaz_app"));
        cardaz_app->resize(695, 348);
        centralWidget = new QWidget(cardaz_app);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        form_tabcontrol = new QStackedWidget(centralWidget);
        form_tabcontrol->setObjectName(QStringLiteral("form_tabcontrol"));
        form_tabcontrol->setGeometry(QRect(0, 20, 691, 301));
        login_form = new QWidget();
        login_form->setObjectName(QStringLiteral("login_form"));
        label = new QLabel(login_form);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(200, 100, 271, 21));
        yesacc_BTN = new QPushButton(login_form);
        yesacc_BTN->setObjectName(QStringLiteral("yesacc_BTN"));
        yesacc_BTN->setGeometry(QRect(150, 180, 91, 29));
        noacc_BTN = new QPushButton(login_form);
        noacc_BTN->setObjectName(QStringLiteral("noacc_BTN"));
        noacc_BTN->setGeometry(QRect(450, 180, 91, 29));
        form_tabcontrol->addWidget(login_form);
        P_info_form = new QWidget();
        P_info_form->setObjectName(QStringLiteral("P_info_form"));
        first_name_TB = new QLineEdit(P_info_form);
        first_name_TB->setObjectName(QStringLiteral("first_name_TB"));
        first_name_TB->setGeometry(QRect(110, 30, 161, 21));
        fname_label = new QLabel(P_info_form);
        fname_label->setObjectName(QStringLiteral("fname_label"));
        fname_label->setGeometry(QRect(20, 30, 91, 21));
        last_name_TB = new QLineEdit(P_info_form);
        last_name_TB->setObjectName(QStringLiteral("last_name_TB"));
        last_name_TB->setGeometry(QRect(390, 30, 161, 21));
        lname_label = new QLabel(P_info_form);
        lname_label->setObjectName(QStringLiteral("lname_label"));
        lname_label->setGeometry(QRect(290, 30, 91, 21));
        mi_TB = new QLineEdit(P_info_form);
        mi_TB->setObjectName(QStringLiteral("mi_TB"));
        mi_TB->setGeometry(QRect(620, 30, 41, 21));
        mi_label = new QLabel(P_info_form);
        mi_label->setObjectName(QStringLiteral("mi_label"));
        mi_label->setGeometry(QRect(590, 30, 31, 21));
        phone_TB = new QLineEdit(P_info_form);
        phone_TB->setObjectName(QStringLiteral("phone_TB"));
        phone_TB->setGeometry(QRect(110, 60, 131, 21));
        phone_Label = new QLabel(P_info_form);
        phone_Label->setObjectName(QStringLiteral("phone_Label"));
        phone_Label->setGeometry(QRect(30, 60, 61, 21));
        zipcode_Label = new QLabel(P_info_form);
        zipcode_Label->setObjectName(QStringLiteral("zipcode_Label"));
        zipcode_Label->setGeometry(QRect(490, 150, 71, 21));
        street_Label = new QLabel(P_info_form);
        street_Label->setObjectName(QStringLiteral("street_Label"));
        street_Label->setGeometry(QRect(10, 120, 111, 21));
        state_Label = new QLabel(P_info_form);
        state_Label->setObjectName(QStringLiteral("state_Label"));
        state_Label->setGeometry(QRect(270, 150, 41, 21));
        phone_TB_2 = new QLineEdit(P_info_form);
        phone_TB_2->setObjectName(QStringLiteral("phone_TB_2"));
        phone_TB_2->setGeometry(QRect(570, 150, 91, 21));
        city_Label = new QLabel(P_info_form);
        city_Label->setObjectName(QStringLiteral("city_Label"));
        city_Label->setGeometry(QRect(80, 150, 31, 21));
        street_TB = new QLineEdit(P_info_form);
        street_TB->setObjectName(QStringLiteral("street_TB"));
        street_TB->setGeometry(QRect(130, 120, 531, 21));
        state_CB = new QComboBox(P_info_form);
        state_CB->setObjectName(QStringLiteral("state_CB"));
        state_CB->setGeometry(QRect(320, 150, 161, 21));
        state_CB->setEditable(true);
        street_TB_2 = new QLineEdit(P_info_form);
        street_TB_2->setObjectName(QStringLiteral("street_TB_2"));
        street_TB_2->setGeometry(QRect(130, 150, 121, 21));
        titlelLabel = new QLabel(P_info_form);
        titlelLabel->setObjectName(QStringLiteral("titlelLabel"));
        titlelLabel->setGeometry(QRect(250, 0, 181, 16));
        execute_BTN = new QPushButton(P_info_form);
        execute_BTN->setObjectName(QStringLiteral("execute_BTN"));
        execute_BTN->setGeometry(QRect(550, 220, 91, 29));
        form_tabcontrol->addWidget(P_info_form);
        page = new QWidget();
        page->setObjectName(QStringLiteral("page"));
        listWidget = new QListWidget(page);
        listWidget->setObjectName(QStringLiteral("listWidget"));
        listWidget->setGeometry(QRect(20, 50, 641, 201));
        start_info_Label = new QLabel(page);
        start_info_Label->setObjectName(QStringLiteral("start_info_Label"));
        start_info_Label->setGeometry(QRect(130, 20, 411, 21));
        ready_BTN = new QPushButton(page);
        ready_BTN->setObjectName(QStringLiteral("ready_BTN"));
        ready_BTN->setGeometry(QRect(570, 250, 91, 29));
        form_tabcontrol->addWidget(page);
        page_2 = new QWidget();
        page_2->setObjectName(QStringLiteral("page_2"));
        back_BTN = new QPushButton(page_2);
        back_BTN->setObjectName(QStringLiteral("back_BTN"));
        back_BTN->setGeometry(QRect(40, 0, 91, 29));
        heart_graph = new QGraphicsView(page_2);
        heart_graph->setObjectName(QStringLiteral("heart_graph"));
        heart_graph->setGeometry(QRect(40, 40, 611, 221));
        form_tabcontrol->addWidget(page_2);
        cardaz_app->setCentralWidget(centralWidget);

        retranslateUi(cardaz_app);

        form_tabcontrol->setCurrentIndex(1);


        QMetaObject::connectSlotsByName(cardaz_app);
    } // setupUi

    void retranslateUi(QMainWindow *cardaz_app)
    {
        cardaz_app->setWindowTitle(QApplication::translate("cardaz_app", "cardaz_app", Q_NULLPTR));
        label->setText(QApplication::translate("cardaz_app", "Do you have a record with us aleady?", Q_NULLPTR));
        yesacc_BTN->setText(QApplication::translate("cardaz_app", "Yes", Q_NULLPTR));
        noacc_BTN->setText(QApplication::translate("cardaz_app", "No", Q_NULLPTR));
        fname_label->setText(QApplication::translate("cardaz_app", "<html><head/><body><p>First Name:</p></body></html>", Q_NULLPTR));
        lname_label->setText(QApplication::translate("cardaz_app", "<html><head/><body><p>Last Name:</p></body></html>", Q_NULLPTR));
        mi_label->setText(QApplication::translate("cardaz_app", "mi:", Q_NULLPTR));
        phone_Label->setText(QApplication::translate("cardaz_app", "Phone#: ", Q_NULLPTR));
        zipcode_Label->setText(QApplication::translate("cardaz_app", "Zip Code:", Q_NULLPTR));
        street_Label->setText(QApplication::translate("cardaz_app", "Street Address:", Q_NULLPTR));
        state_Label->setText(QApplication::translate("cardaz_app", "State:", Q_NULLPTR));
        city_Label->setText(QApplication::translate("cardaz_app", "City:", Q_NULLPTR));
        state_CB->clear();
        state_CB->insertItems(0, QStringList()
         << QApplication::translate("cardaz_app", "<None>", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Alabama", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Alaska", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Arkansas", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "California", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Colorado", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Connecticut", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Delaware", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Florida", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Georgia", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Hawaii", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Idaho", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Illinois", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Indiana", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Iowa", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Kansas", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Kentucky", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "louisiana", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Maine", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Maryland", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Massachusetts", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Michigan", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Minnesota", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Mississippi", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Missouri", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Montana", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Nebraska", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Nevada", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "New Hamshire", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "New Jersey", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "New Mexico", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "New York", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "North Carolina", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "North Dakota", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Ohio", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Oklahoma", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Oregon", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Pennsylvannia", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Rhode Island", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "South Carolina", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Tennessee", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Texas", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Utah", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Vermont", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Virginia", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "West Virginia", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Wisconsin", Q_NULLPTR)
         << QApplication::translate("cardaz_app", "Wyoming", Q_NULLPTR)
        );
        titlelLabel->setText(QApplication::translate("cardaz_app", "Patient infomation Form", Q_NULLPTR));
        execute_BTN->setText(QApplication::translate("cardaz_app", "Start", Q_NULLPTR));
        start_info_Label->setText(QApplication::translate("cardaz_app", "Please Select your account, and hit ready to start the test.", Q_NULLPTR));
        ready_BTN->setText(QApplication::translate("cardaz_app", "PushButton", Q_NULLPTR));
        back_BTN->setText(QApplication::translate("cardaz_app", "back", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class cardaz_app: public Ui_cardaz_app {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CARDAZ_APP_H
