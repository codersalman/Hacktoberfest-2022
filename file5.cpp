#include <iostream>
using namespace std;

int main() {
	// your code goes here
	int t;
	cin >> t;
	while (t--)
	{
		int N;
		cin >> N;
		int array[N];
		int k;
		int m;
		cin >> m;
		cin >> k;
		bool flag = false;
		for (int i = 0; i < N; i++)
		{
			cin >> array[i];
			if (array[i] == 0)
			{
				flag = true;
			}
		}
		if (flag == false)
		{
			cout << "100\n";
		}
		else if (flag == true)
		{
			flag = false;
			for (int i = 0; i < m; i++)
			{
				if (array[i] == 0)
				{
					flag = true;
				}
			}
			if (flag == false)
			{
				cout << k << "\n";
			}
			else
				cout << "0\n";
		}
	}
	return 0;
}