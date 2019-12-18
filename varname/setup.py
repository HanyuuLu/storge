import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="varName",
    version="0.0.1",
    author="Hanyuu Furude",
    author_email="Furude_Hanyuu@outlook.com",
    description="fetch lable of variable",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/HanyuuFurude/toolbox",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)