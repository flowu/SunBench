from setuptools import setup, find_packages

setup(
    name='YourProjectName',
    version='0.1.0',
    packages=find_packages(),
    install_requires=[
        'flask',  # Add your project dependencies here
        'requests',
        'flask_caching',
        'gunicorn',  # If you need a WSGI server for deployment
        # More dependencies can be added here
    ],
    entry_points={
        'console_scripts': [
            'run-app=your_package.module:main_function',  # Replace 'your_package.module:main_function'
        ],
    },
    extras_require={
        'dev': [
            'pytest',  # Testing tools
            'flake8',  # Linting tools
            'sphinx',  # Documentation tools
        ]
    },
    classifiers=[
        # Classifiers help users find your project by categorizing it
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',  # Minimum version requirement of Python
    author='Your Name',
    author_email='your.email@example.com',
    description='A short description of the project',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',  # This is important for rendering the README on PyPI
    url='https://github.com/yourusername/yourprojectname',  # Project URL
)
