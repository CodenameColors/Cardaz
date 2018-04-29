#include "cardaz_app.h"
#include "ui_cardaz_app.h"

cardaz_app::cardaz_app(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::cardaz_app)
{
    ui->setupUi(this);
}

cardaz_app::~cardaz_app()
{
    delete ui;
}
