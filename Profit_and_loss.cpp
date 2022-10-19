#include<iostream>
using namespace std;
float Profit(float,float,float,float,float);
int main()
{
    float no_of_shares,sales_price,purchase_commission,purchase_price,sales_commission,profit;
    cout<<"Enter the no of shares: ";
    cin>>no_of_shares;
    cout<<"Enter purchase price per share: ";
    cin>>purchase_price;
    cout<<"Enter purchase commission paid: ";
    cin>>purchase_commission;
    cout<<"Enter sales price per share: ";
    cin>>sales_price;
    cout<<"Enter sales commision paid: ";
    cin>>sales_commission;
    profit=Profit(no_of_shares,purchase_price,purchase_commission,sales_price,sales_commission);
    if(profit>0)
    {
        cout<<"Stock resulted in a profit\n";
    }
    else
    {
        cout<<"stock resulted in loss\n";
    }
    return 0;
}
float Profit(float NS,float PP,float PC,float SP,float SC)
{
    float profit;
    profit=((NS*SP)-SC)-((NS*PP)+PC);
    return profit;
}