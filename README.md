# TOPSIS Implementation in Python

**Course:** UCS654 – Predictive Analytics using Statistics  
**Assignment:** Assignment-1 (TOPSIS)  
**Author:** Sartaj Singh Virdi  
**Roll Number:** 102303259

##  About the Project

This project implements the TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) method using Python.

TOPSIS is a Multi-Criteria Decision Making (MCDM) technique that ranks multiple alternatives based on their relative closeness to an ideal best solution and an ideal worst solution. It is widely used in decision-making problems involving multiple conflicting criteria.

##  Features

* Command-line based TOPSIS tool
* Supports CSV and Excel input files
* Automatically computes:
  * Normalized decision matrix
  * Weighted normalized matrix
  * Ideal best & worst solutions
  * TOPSIS score
  * Final ranking of alternatives
* Easy to use and lightweight

##  Project Structure
```
topsis-mcdm-tool/
│── topsis/
│   ├── __init__.py
│   └── topsis.py
│── sample.csv
│── output.csv
│── setup.py
│── README.md
```

##  System Requirements

* Python: 3.7 or higher
* Libraries:
  * pandas
  * numpy

##  Installation

The package can be installed using pip after publishing to PyPI.
```bash
pip install topsis-mcdm-tool
```

(If installing locally for development)
```bash
pip install .
```

##  Usage

Run the following command in the terminal or command prompt:
```bash
topsis <inputFile> <weights> <impacts> <outputFile>
```

### Parameters

* `inputFile` → CSV or Excel file containing data
* `weights` → Comma-separated weights for each criterion
* `impacts` → `+` for benefit, `-` for cost criteria
* `outputFile` → Output CSV/Excel file with scores and ranks

##  Example
```bash
topsis sample.csv "1,1,1,1" "+,+,-,+" result.csv
```

### Output

The output file will contain:
* Topsis Score
* Rank (lower rank = better alternative)

##  Sample Input Format
```csv
Model,Price,Performance,Camera,Battery
A,25000,8,7,4000
B,30000,9,8,4500
C,20000,7,6,3800
```

##  Output Columns

* `Topsis Score` – Closeness coefficient
* `Rank` – Ranking of alternatives

##  Conclusion

This project demonstrates the practical implementation of the TOPSIS algorithm for multi-criteria decision making using Python. It is suitable for academic use and real-world decision analysis problems.

##  License

This project is released under the MIT License.
