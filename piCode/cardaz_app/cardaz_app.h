#ifndef CARDAZ_APP_H
#define CARDAZ_APP_H

#include <QMainWindow>

namespace Ui {
class cardaz_app;
}

class cardaz_app : public QMainWindow
{
    Q_OBJECT

public:
    explicit cardaz_app(QWidget *parent = 0);
    ~cardaz_app();

private:
    Ui::cardaz_app *ui;
};

#endif // CARDAZ_APP_H
