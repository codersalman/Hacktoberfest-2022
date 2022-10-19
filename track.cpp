#include<iostream>
using namespace std;
int unq(int arr[], int n)
{
	int xS = 0;
	for (size_t i = 0; i <n; i++)
	{
		xS = xS ^ arr[i];
	}
	return xS;
}
int main()
{
	cout << "How many numbers enter: "; int n; cin >> n;
		int* arr= new int[n];
		for (size_t i = 0; i < n; i++)
		{
			cin >> arr[i];
		}
		cout << "Unque number in array: ";
		cout<<unq(arr, n);
		delete[]arr;
		arr = 0;
}