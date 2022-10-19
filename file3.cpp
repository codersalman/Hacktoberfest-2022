#include<iostream>
#include<string>
using namespace std;
int main()
{
	int n, k;
	cin >> n >> k;
	int product = 1;
	for (int i = 0; i < n; i++)
		product = product * 10;
	int start=product/10;
	int array[100];
	int u=0;
	for(int mm=start;mm<product;mm++)
	{
	   string h=to_string(mm);
	   int count=0;
	   for(int i=0;i<h.size()-1;i++)
	   {
	       string l1=to_string(h[i]);
	       string l2=to_string(h[i+1]);
	       int hxh=stoi(l1)-48;
	       int xxh=stoi(l2)-48;
	       int diff=hxh-xxh;
	       if(diff<0)
	       {
	           diff=-diff;
	       }
	       if(diff==k)
	       {
	          count++;
	       }
	   }
	   if(count==h.size()-1)
	   {
	       array[u]=mm;
	       u++;
	   }
	}
	for(int i=0;i<u;i++)
	cout<<array[i]<<" ";
}